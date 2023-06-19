$(document).ready(function() {

    const currentUrl = window.location.href;

    // variable pour stocker data
    let storedRowData = null;

    // Initialisation du DataTable
    const dataTable = $('#data-table').DataTable({
        ajax: {
            url: currentUrl + 'api/emp',
            dataSrc: ''
        },
        columns: [{
                data: null,
                render: function(data, type, row) {
                    return '<button data-bs-toggle="modal" data-bs-target="#modal" type="button" class="btn btn-detail"><i class="bi bi-search"></i></button>';
                }
            },
            {
                data: 'prenom' // Colonne "Prenom"
            },
            {
                data: 'nom' // Colonne "Nom"
            },
            {
                data: 'tel' // Colonne "Tel"
            },
            {
                data: 'email_pro' // Colonne "email"
            },
        ],
        order: [1, "asc"], // Trier par ordre décroissant 1ere col

        // traduction en français
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/fr-FR.json'
        },
        autoWidth: true,
        pageLength: 5,
        lengthMenu: [5, 10, 20, 50],
        columnDefs: [{
            className: "dt-center",
            targets: "_all"
        }],
    });

    // event bouton detail
    $('#data-table').on('click', '.btn-detail', function() {
        const rowData = dataTable.row($(this).closest('tr')).data();
        const id = rowData.id; // Get the ID from the row data
        storedRowData = dataTable.row($(this).closest('tr')).data();

        const modalTitle = $('#modal .modal-title');
        const modalBody = $('#modal .modal-body');

        modalTitle.text('Détails');

        // HTML
        let html = '';
        for (const key in rowData) {
            if (key !== 'id') {
                const displayedKey = changeKeyName(key);
                html += `<p><strong>${displayedKey}:</strong> ${rowData[key]}</p>`;
            }
        }

        // boutons
        html += `
    <div class="text-center">
        <button class="btn btn-warning" id="btn-edit" type="submit"><i class="bi bi-pencil-square"></i></button>
        <button class="btn btn-danger btn-delete" data-id="${id}" data-bs-dismiss="modal"><i class="bi bi-trash-fill"></i></button>
    </div>`;

        modalBody.html(html);

        // ouvrir le modal
        $('#modal').modal('show');
    });

    // changer le nom des clés
    function changeKeyName(key) {
        switch (key) {
            case 'prenom':
                return 'Prénom';
            case 'nom':
                return 'Nom';
            case 'tel':
                return 'Téléphone';
            case 'email_pro':
                return 'Email professionnel';
            case 'email_perso':
                return 'Email personnel'
            default:
                return key;
        }
    }

    // event bouton delete
    $('#modal').on('click', '.btn-delete', function() {
        const id = $(this).data('id');

        // requete DELETE
        if (confirm('Êtes-vous sûr de vouloir supprimer cette date ?')) {
            $.ajax({
                url: currentUrl + `api/emp/${id}`,
                type: 'DELETE',
                success: function(response) {
                    
                    dataTable.ajax.reload(null, false);
                    console.log('ok');
                },
                error: function(xhr, status, error) {
                  
                    console.error('erreur', error);
                }
            });
        }

        $('#modal').modal('hide');
    });

    // event bouton ajouter
    $('.btn-icon').on('click', function() {
        const modalTitle = $('#modal .modal-title');
        const modalBody = $('#modal .modal-body');

        modalTitle.text('Ajouter un(e) employé(e)');

        // HTML
        const formHtml = `
        <form id="add-form">
            <div class="mb-3">
                <label for="prenom" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="prenom" name="prenom" required>
            </div>
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" name="nom" required>
            </div>
            <div class="mb-3">
                <label for="sexe" class="form-label">Sexe</label>
                <select class="form-select" id="sexe" name="sexe" required>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Autre">Autre</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="tel" class="form-label">Téléphone</label>
                <input type="text" class="form-control" id="tel" name="tel">
            </div>
            <div class="mb-3">
                <label for="email_pro" class="form-label">Email professionnel</label>
                <input type="email" class="form-control" id="email_pro" name="email_pro">
            </div>
            <div class="mb-3">
                <label for="email_perso" class="form-label">Email personnel</label>
                <input type="email" class="form-control" id="email_perso" name="email_perso">
            </div>
            <div class="text-center">
                <button class="btn btn-primary" type="submit">Enregistrer</button>
            </div>
        </form>
    `;

        modalBody.html(formHtml);

        $('#modal').modal('show');
    });

    // envoi du formulaire
    $('#modal').on('submit', '#add-form', function(e) {
        e.preventDefault();

        const formData = $(this).serializeArray();

        // change null en Non renseigné
        for (let i = 0; i < formData.length; i++) {
            if (formData[i].value === '') {
                formData[i].value = 'Non renseigné';
            }
        }

        // requete POST
        $.ajax({
            url: currentUrl + 'api/emp/',
            method: 'POST',
            data: formData,
            success: function(response) {
                
                dataTable.ajax.reload(null, false);
            },
            error: function(error) {
              
                console.error(error);
            }
        });

    
        $('#modal').modal('hide');
    });


    // event bouton edit
    $(document).on('click', '#btn-edit', function() {
        if (storedRowData) {
            const rowData = storedRowData;

 
            const modalTitle = $('#modal .modal-title');
            const modalBody = $('#modal .modal-body');

       
            modalTitle.text('Modifier la fiche');

            // HTML
            const formHtml = `
        <form id="edit-form">
            <div class="mb-3">
                <label for="prenom" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="prenom" name="prenom" value="${rowData.prenom}" required>
            </div>
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" name="nom" value="${rowData.nom}" required>
            </div>
            <div class="mb-3">
                <label for="sexe" class="form-label">Sexe</label>
                <select class="form-select" id="sexe" name="sexe" required>
                    <option value="Female" ${rowData.sexe === 'Female' ? 'selected' : ''}>Female</option>
                    <option value="Male" ${rowData.sexe === 'Male' ? 'selected' : ''}>Male</option>
                    <option value="Autre" ${rowData.sexe === 'Autre' ? 'selected' : ''}>Autre</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="tel" class="form-label">Téléphone</label>
                <input type="text" class="form-control" id="tel" name="tel" value="${rowData.tel}">
            </div>
            <div class="mb-3">
                <label for="email_pro" class="form-label">Email professionnel</label>
                <input type="text" class="form-control" id="email_pro" name="email_pro" value="${rowData.email_pro}">
            </div>
            <div class="mb-3">
                <label for="email_perso" class="form-label">Email personnel</label>
                <input type="text" class="form-control" id="email_perso" name="email_perso" value="${rowData.email_perso}">
            </div>
            <div class="text-center">
                <button class="btn btn-primary" type="submit">Enregistrer</button>
            </div>
        </form>
    `;

         
            modalBody.html(formHtml);

         
            $('#modal').modal('show');
        }

    });


    // envoi formulaire
    $('#modal').on('submit', '#edit-form', function(e) {
        e.preventDefault(); 
        const id = storedRowData.id
       
        const formData = $(this).serializeArray();

        // null en non renseigné
        for (let i = 0; i < formData.length; i++) {
            if (formData[i].value === '') {
                formData[i].value = 'Non renseigné';
            }
        }

        // requête PUT
        $.ajax({
            url: currentUrl + `api/emp/${id}/`,
            method: 'PUT',
            data: formData,
            success: function(response) {
       
                dataTable.ajax.reload(null, false);
               
            },
            error: function(error) {
               
                console.error(error);
            }
        });

    
        $('#modal').modal('hide');
    });

});