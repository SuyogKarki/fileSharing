import JSZip from 'jszip';
import CryptoJS from 'crypto-js';
import { b64toBlob, base64ArrayBuffer, asyncForEach, fileToArrayBuffer } from './utils';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { axiosInstance, storage } from '../config';
export const getSHA256 = async value => {
  return await CryptoJS.SHA256(value).toString();
};

export const checkCrypt = async file => {
  try {
    var zip = await JSZip.loadAsync(file);
    if ('.meta' in zip.files) {
      var content = JSON.parse(await zip.file('.meta').async('string'));
      if ('crypt' in content) {
        if (content['crypt'] === true) {
          return true;
        }
      }
    }
  } catch {}
  return false;
};

function incrementProgress() {
  postMessage('incrementProgress');
}

export const handleFiles = async fileList => {
  var numCrypt = 0;
  await asyncForEach(fileList, async file => {
    var c = await checkCrypt(file);
    if (c) {
      numCrypt += 1;
    }
  });

  if (numCrypt === 1 && fileList.length === 1) {
    return 'decrypt';
  } else {
    if (fileList.length === 1) {
      return 'encrypt';
    } else if (fileList.length > 1) {
      return 'encrypt-multiple';
    }
  }
};

export const combineToZip = async fileList => {
  var zip = new JSZip();
  await asyncForEach(fileList, async file => {
    zip.file(file.name, file);
  });
  return zip.generateAsync({
    type: 'base64',
  });
};

export const getKey = async key => {
  return await getSHA256('cryption-' + key + '-cryption');
};

export const fileToData = async file => {
  var c = await fileToArrayBuffer(file);
  return base64ArrayBuffer(c);
};

export const encrypt = async (data, filename, key, hint, email, id) => {
  console.log(id);
  var eKey = await getKey(key);
  console.log('1');
  incrementProgress();

  var encrypted = await CryptoJS.AES.encrypt(data, eKey).toString();
  console.log(2);
  incrementProgress();
  var md5 = CryptoJS.MD5(data).toString();
  console.log(3);
  incrementProgress();
  var sha256HashEncrypted = await CryptoJS.AES.encrypt(await getSHA256(encrypted), eKey).toString();
  var sha256HashUnencrypted = await CryptoJS.AES.encrypt(await getSHA256(data), eKey).toString();
  console.log(4);
  incrementProgress();
  const name = await CryptoJS.AES.encrypt(filename, eKey).toString();
  console.log(5);
  incrementProgress();
  var metadata = {
    hint: hint != null ? hint : '',
    filename: name,
    crypt: true,
    sha256Before: sha256HashUnencrypted,
    sha256After: sha256HashEncrypted,
  };
  console.log(6);
  incrementProgress();

  var zip = new JSZip();
  zip.file('.meta', JSON.stringify(metadata));

  zip.file('file', encrypted, {
    base64: true,
  });

  var newZip = await zip.generateAsync({
    type: 'blob',
  });
  console.log(7);
  incrementProgress();
  const fileName = new Date().getTime() + md5 + '.cryption';
  const postRef = ref(storage, `/items/${fileName}`);
  const uploadTask = uploadBytesResumable(postRef, newZip);
  let link;
  await uploadTask.on(
    'state_changed',
    snapshot => {
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
          break;
      }
    },
    err => {
      console.log(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(url => {
        console.log(8);
        incrementProgress();
        link = url;
        sendFile(link);
        return;
      });
      return;
    }
  );
  //   const { user } = useContext(AuthContext);
  const sendFile = async link => {
    await axiosInstance
      .post('/files', {
        title: `${md5}.cryption`,
        fileUrl: link,
        sharedBy: id,
        email: email,
      })
      .then(() => {
        incrementProgress();
      });
  };
};

export const decrypt = async (file, key) => {
  var eKey = await getKey(key);
  incrementProgress();
  var zip = await JSZip.loadAsync(file);
  var metadata = JSON.parse(await zip.file('.meta').async('string'));
  var content = await zip.file('file').async('base64');
  incrementProgress();
  try {
    var decrypted = await CryptoJS.AES.decrypt(content, eKey).toString(CryptoJS.enc.Utf8);
  } catch {
    return {
      file: null,
      error: 'key-incorrect-or-corrupted',
      name: null,
    };
  }
  incrementProgress();
  var sha256HashEncrypted = await getSHA256(content);
  var sha256HashUnencrypted = await getSHA256(decrypted);
  incrementProgress();
  if (
    (await CryptoJS.AES.decrypt(metadata.sha256Before, eKey).toString(CryptoJS.enc.Utf8)) === sha256HashUnencrypted &&
    (await CryptoJS.AES.decrypt(metadata.sha256After, eKey).toString(CryptoJS.enc.Utf8)) === sha256HashEncrypted
  ) {
    incrementProgress();
    var name = await CryptoJS.AES.decrypt(metadata.filename, eKey).toString(CryptoJS.enc.Utf8);
    incrementProgress();
    var blob = b64toBlob(decrypted);
    var blobUrl = URL.createObjectURL(blob);
    incrementProgress();
    return {
      file: blobUrl,
      error: null,
      name,
    };
  }
  return {
    file: null,
    error: 'no-integrity',
    name: null,
  };
};

export const getHint = async file => {
  var zip = await JSZip.loadAsync(file);
  var metadata = JSON.parse(await zip.file('.meta').async('string'));
  return metadata.hint ? metadata.hint : null;
};
