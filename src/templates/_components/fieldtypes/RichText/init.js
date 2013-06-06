var config = {{config|raw}};
var targetSelector = '.redactor-{{handle}}';
if (typeof config.buttonsCustom == "undefined")
{
  config.buttonsCustom = {};
}

config.buttonsCustom.image = {
	title: Craft.t('Insert image'),
	dropdown:
	{
		from_web: {
			title: Craft.t('Insert URL'),
			callback: function () { this.imageShow();}
		},
		from_assets: {
			title: Craft.t('Choose image'),
			callback: function () {

				this.selectionSave();

				if (typeof this.assetSelectionModal == 'undefined')
				{
					this.assetSelectionModal = Craft.createElementSelectorModal('Asset', {
						criteria: { kind: 'image' },
						onSelect: $.proxy(function(elements) {
							if (elements.length)
							{
								this.selectionRestore();

								var element = elements[0].$element;
								this.insertNode($('<img src="' + element.attr('data-url') + '" />')[0]);

								this.sync();
							}
						}, this)
					});
				}
				else
				{
					this.assetSelectionModal.show();
				}
			}
		}
	}
};

config.buttonsCustom.link = {
	title: Craft.t('Link'),
	dropdown: {
		link_entry:
		{
			title: Craft.t('Link to an entry'),
			callback: function () {

				this.selectionSave();

				if (typeof this.entrySelectionModal == 'undefined')
				{
					this.entrySelectionModal = Craft.createElementSelectorModal('Entry', {
						sources: {{sections|raw}},
						onSelect: $.proxy(function(elements) {
							if (elements.length)
							{
                                this.selectionRestore();
                                var element = elements[0];
                                var selection = this.getSelectionText();
                                var title = selection.length > 0 ? selection : element.label;
                                this.insertNode($('<a href="' + element.$element.attr('data-url') + '">' + title + '</a>')[0]);
                                this.sync();
							}
						}, this)
					});
				}
				else
				{
					this.entrySelectionModal.show();
				}
			}
		},
		link:
		{
			title: Craft.t('Insert link'),
			callback: function () { this.linkShow();}
		},
		unlink:
		{
			title: Craft.t('Remove link'),
			callback: function () { this.exec('unlink');}
		}
	}
}

$(targetSelector).redactor(config);