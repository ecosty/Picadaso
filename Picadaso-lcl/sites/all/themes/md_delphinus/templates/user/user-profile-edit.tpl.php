<?php print render($form['form_id']); ?>
<?php print render($form['form_build_id']); ?>
<?php print render($form['form_token']); ?>

<div class="account-page-section">
    <h3 class="account-page-heading">Account Details</h3>

    <div class="card card--block">
      <div class="row">
        <div class="col-xs-12 col-sm-6 input-row">
            <?php print render($form['field_first_name']); ?>
        </div>
        <div class="col-xs-12 col-sm-6 input-row">
            <?php print render($form['field_last_name']); ?>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-sm-6 input-row">
            <?php print render($form['field_birth_date']); ?>
        </div>

        <div class="col-xs-12 col-sm-6 input-row">
            <?php print render($form['account']['mail']); ?>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-sm-6 input-row">
          <?php print render($form['field_user_phone_number']); ?>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-sm-3">
          <div class="edit-user-submit-button">
            <?php print render($form['actions']); ?>
          </div>
        </div>
      </div>
  </div>
</div>