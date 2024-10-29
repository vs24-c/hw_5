async function deleteAuto(id) {
  try {
    const response = await fetch(`/auto/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response) {
      window.location.reload(true);
    }
  } catch (error) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

class ReqManag {
  static handleFileSelect(event, imgSelect) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgElement = document.querySelector(imgSelect);
        imgElement.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

window.onload = function () {
  //----------------find input and img---------------------------//
  const fileInp = document.getElementById('imgPrev');

  //----------------------Listen to change input and start class------------------//
  fileInp.addEventListener('change', (event) => {
    ReqManag.handleFileSelect(event, '#imgPrevew');
  });
};
