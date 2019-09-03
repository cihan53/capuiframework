/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk 
 * Email: cihanozturk@crypttech.com
 */

import swal from "sweetalert";


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

const Alert=swal;

export default Alert;