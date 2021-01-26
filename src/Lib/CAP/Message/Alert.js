/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk 
 * Email: cihanozturk@crypttech.com
 */

import swal from "sweetalert";
import Utils from "../Utils/Utils";


/**
 * Kullanım Şekli
 * Exp:
 *
 * swal({
    title: CAP.__t("Eminmisiniz?"),
    text: CAP.__t("Bu kayıt tüm ilişkileri ile beraber silinecektir."),
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      ....
    }
  });
 *
 * @type {SweetAlert}
 */

swal.setDefaults({
  buttons: [Utils.__t("Onaylıyorum!"), Utils.__t("Vazgeç")]
});


const Alert=swal;

export default Alert;