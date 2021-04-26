$(document).ready(function() {
    // popup
    $('[data-toggle="modal"]').each(function() {
        $(this).on('click', function() {
            const target = `#${$(this).data('target')}`;
            showModal(target);
        });
    });

    $('[data-modal-dismiss]').each(function() {
        $(this).on('click', function() {
            const target = $(this).closest('.popup');
            closeModal(target);
        });
    });

    function showModal(target) {
        $('body').css('overflow', 'hidden');
        $('.popup').hide();
        $(target).slideIn(300);
    }

    function closeModal() {
        $('.popup').hide();
        $('body').css('overflow', 'auto');
    }



    // vertical-tabs
    $('.tab_content').hide();
    $('.tab_content:first').show();
    $('ul.tabs li').click(function() {
        $('.tab_content').hide();
        var activeTab = $(this).attr('rel');
        $('#' + activeTab).fadeIn();

        $('ul.tabs li').removeClass('active');
        $(this).addClass('active');

        $('.tab_drawer_heading').removeClass('d_active');
        $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass('d_active');
    });
    $('.tab_drawer_heading').click(function() {
        $('.tab_content').hide();
        var d_activeTab = $(this).attr('rel');
        $('#' + d_activeTab).fadeIn();

        $('.tab_drawer_heading').removeClass('d_active');
        $(this).addClass('d_active');

        $('ul.tabs li').removeClass('active');
        $("ul.tabs li[rel^='" + d_activeTab + "']").addClass('active');
    });

    // payment-tabs
    $('.payment_content').hide();
    $('.payment_content:first').show();
    $('ul.payment-tabs li').click(function() {
        $('.payment_content').hide();
        var activeTab = $(this).attr('rel');
        $('#' + activeTab).fadeIn();

        $('ul.payment-tabs li').removeClass('active');
        $(this).addClass('active');

        $('.tab_drawer_heading').removeClass('d_active');
        $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass('d_active');
    });
    $('.tab_drawer_heading').click(function() {
        $('.payment_content').hide();
        var d_activeTab = $(this).attr('rel');
        $('#' + d_activeTab).fadeIn();

        $('.tab_drawer_heading').removeClass('d_active');
        $(this).addClass('d_active');

        $('ul.payment-tabs li').removeClass('active');
        $("ul.payment-tabs li[rel^='" + d_activeTab + "']").addClass('active');
    });

    // payment-tabs
    $('.payment_content2').hide();
    $('.payment_content2:first').show();
    $('ul.payment-tabs2 li').click(function() {
        $('.payment_content2').hide();
        var activeTab = $(this).attr('rel');
        $('#' + activeTab).fadeIn();

        $('ul.payment-tabs2 li').removeClass('active');
        $(this).addClass('active');

        $('.tab_drawer_heading').removeClass('d_active');
        $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass('d_active');
    });
    $('.tab_drawer_heading').click(function() {
        $('.payment_content2').hide();
        var d_activeTab = $(this).attr('rel');
        $('#' + d_activeTab).fadeIn();

        $('.tab_drawer_heading').removeClass('d_active');
        $(this).addClass('d_active');

        $('ul.payment-tabs2 li').removeClass('active');
        $("ul.payment-tabs2 li[rel^='" + d_activeTab + "']").addClass('active');
    });

    // Wizard Steps
    const steps = $('.wizard-steps .step');
    const progress = $('.wizard-steps .progress');
    const bodySections = $('.wizard-body .wizard-tab');

    let step = 0;

    function move(n) {
        if (n > steps.length - 1) {
            return;
        }
        $(steps).removeClass('active finished');
        $(steps[n]).addClass('active');
        $(steps[n]).prevAll('.step').addClass('active finished');
        $(bodySections).hide();
        $(bodySections[n]).show();
        $(progress).css({
            width: (100 / 3) * (n + 1) + '%',
        });
    }
    move(step);

    $('.wizard-next-btn').each(function() {
        $(this).click(function() {
            move(step + 1);
            step++;
        });
    });
    $('.wizard-prev-btn').each(function(i) {
        $(this).click(function() {
            move(step - 1);
            step--;
        });
    });

    // Slider Filters
    $('.slider-filters li').each(function() {
        $(this).on('click', function() {
            const filterValue = $(this).data('filter');
            $('.slider-filters li').removeClass('active');
            $(this).addClass('active');
            if (filterValue === 'all') {
                $('.slider').slick('slickUnfilter');
                $('.slider').slick('setPosition');
            } else {
                $('.slider').slick('slickUnfilter');
                $('.slider').slick(
                    'slickFilter',
                    '[data-filter-value=' + filterValue + ']'
                );
            }
        });
    });

    // Custom Select Dropdown
    $('.custom-select-dropdown').each(function() {
        const selected = $(this).find('option:selected');
        const options = $(this).find('option');
        const list = document.createElement('ul');
        const selectDropdownContainer = document.createElement('div');
        let selectedListItem = document.createElement('div');
        selectDropdownContainer.classList.add('select-dropdown-container');
        selectedListItem.classList.add('dropdown-trigger');
        selectedListItem = fillItem(selected, selectedListItem);
        list.classList.add('dropdown-list');

        $(this).on('change', function() {
            const selected = $(this).find('option:selected');
            let selectedListItem = $(this)
                .next('.select-dropdown-container')
                .find('.dropdown-trigger');
            selectedListItem.html('');
            selectedListItem = fillItem(selected, selectedListItem);
        });
        $(options).each(function() {
            const listItem = document.createElement('li');
            list.appendChild(fillItem($(this), listItem));
        });
        selectDropdownContainer.appendChild(selectedListItem);
        selectDropdownContainer.appendChild(list);
        $(selectDropdownContainer).insertAfter($(this));
        $(this).hide();
    });

    $('.select-dropdown-container').each(function() {
        $(this)
            .find('.dropdown-trigger')
            .on('click', function(e) {
                const container = $(this).parent();
                e.stopPropagation();
                container.addClass('opened');
            });
        $(this)
            .find('.dropdown-list li')
            .on('click', function(e) {
                e.stopPropagation();
                const container = $(this).closest('.select-dropdown-container');
                const originalSelect = container.prev();
                const value = $(this).data('value');
                $(originalSelect).val(value);
                $(originalSelect).trigger('change');

                container.removeClass('opened');
            });
    });

    $('html, body').on('click', function() {
        $('.select-dropdown-container').removeClass('opened');
    });

    function fillItem(option, item) {
        const imageSrc = option.data('image-path');
        const price = option.data('price');
        const value = option.attr('value');
        const text = option.text();

        const imgEl = document.createElement('img');
        const titleEl = document.createElement('h4');
        const priceEl = document.createElement('span');

        $(imgEl).attr('src', imageSrc);
        $(titleEl).text(text);
        $(priceEl).text(price);
        $(item).attr('data-value', value);
        $(item).append(imgEl);
        $(item).append(titleEl);
        $(item).append(priceEl);
        return item;
    }

    // Show loading when page loading
    $(window).on('load', function() {
        $('.loading-circle').hide();
    });

    $('.box').on({
        mouseover: function() {
            $(this).find('img:nth-child(1)').stop().animate({ opacity: 0 }, 600);
            $(this).find('img:nth-child(2)').stop().animate({ opacity: 1 }, 600);
        },
        mouseout: function() {
            $(this).find('img:nth-child(1)').stop().animate({ opacity: 1 }, 600);
            $(this).find('img:nth-child(2)').stop().animate({ opacity: 0 }, 600);
        },
    });

    // Selected Checkbox
    $('.select-checkbox').each(function() {
        $(this).on('change', function(e) {
            const checked = e.target.checked;
            const el = $(this);
            const elParent = el.parent();
            const label = elParent.find('.sublabel');

            if (checked) {
                label.text('Selected');
            } else {
                label.text('Select');
            }
        });
    });
});