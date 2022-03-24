/**
Prototype
Mathilde Davan

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

const loremIpsumText = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Vestibulum feugiat viverra leo, et fermentum risus gravida a.`,
  `Donec sollicitudin vitae enim nec pulvinar.`,
  `Duis sodales feugiat augue nec malesuada.`,
  `Morbi blandit vestibulum arcu tincidunt faucibus.`,
  `Aliquam pulvinar ornare sem, id blandit libero.`,
  `Donec congue neque odio, a consectetur neque sodales sit amet.`,
  `Phasellus et enim faucibus, mollis nisi sed, tincidunt mi.`,
  `Aliquam pretium diam ac odio consectetur luctus.`,
  `Sed nec pellentesque ante.`,
  `Nam eu consequat ipsum, eu facilysis justo.`,
  `Praesent interdum quam quis vulputate facilysis.`,
  `Nam ac mauris sodales, accumsan nisl eget, commodo sapien.`,
  `Phasellus ultricies commodo blandit.`,
  `Donec vehicula ultrices velit, ac placerat nibh bibendum in.`,
  `Nulla id wusto ut massa egestas vestibulum sit amet maximus nunc.`,
  `Sed et quam ante.`,
  `Ut et mi a quam ullamcorper tristique.`,
  `Nam interdum dui vitae risus volutpat maximus.`,
  `Etiam viverra odio felis, eu lobortis ex rutrum ac.`,
  `Proin eget tortor vitae leo rutrum dignissim.`,
  `Pellentesque dolor leo, luctus id metus at, sodales porttitor eros.`,
  `Aenean euismod dapibus justo in luctus.`,
  `Integer mollis nec arcu ut fringilla.`,
  `Morbi nibh nisl, dictum nec erat in, suscipit finibus tortor.`,
  `Nam varius auctor metus, sit amet congue purus tristique id.`,
  `Proin sit amet felis malesuada nibh aliquam venenatis ut eu nisl.`,
  `Cras velit ex, sagittis quis facilysis at, condimentum vitae elit.`,
  `Donec id diam pretium, pharetra mi sit amet, pharetra sem.`,
  `Praesent sit amet lacus ac ipsum pretium accumsan.`,
  `Duis odio leo, maximus ac dui ac, tincidunt varius ligula.`,
  `Nulla malesuada nunc massa, sed pellentesque nisl faucibus eu.`,
  `Suspendisse molestie lectus id magna lobortis, id lobortis nulla luctus.`,
  `Aliquam nec risus massa.`,
  `Donec convallis libero ipsum, nec bibendum odio malesuada vulputate.`,
  `Morbi elementum tortor sem, wel vulputate eros dictum in.`,
  `Cras in egestas leo, eget scelerisque lorem.`,
  `Aliquam ex sem et ante sollicitudin aliquam.`,
  `Duis lacinia nunc quis volutpat tristique.`,
  `Nam wel vestibulum neque, sed elementum dolor.`,
  `Nullam id est dignissim, suscipit dolor quis, dapibus eros.`,
  `Nunc vel ante eget ante porttitor varius quis at dolor.`,
  `Proin sit amet sollicitudin nisl.`,
  `Maecenas a ultricies lorem, vel aliquam nulla.`,
  `Suspendisse at malesuada nunc.`,
  `Mauris ut nisi sit amet dui congue imperdiet eu eget mazza.`,
  `Nullam ac nisl facilysis, tristique tortor ac, condimentum leo.`,
  `Etiam non felis nulla.`,
  `Suspendisse eu justo nibh.`,
  `Vivamus ac vestibulum nibh.`,
  `Donec quis leo cursus, aliquet tortor et, congue libero.`,
  `Mauris nec vehicula magna.`,
  `Quisque vitae bibendum risus.`,
  `Nulla cursus augue id mi viverra viverra.`,
  `Proin id ex ut ligula semper ultrices. Morbi wel quam nisi.`,
  `Phasellus ut eros sit amet felis tincidunt congue.`,
  `In hac habitasse platea dictumst.`,
  `Integer wel placerat massa, id semper nisl.`,
  `Maecenas et libero gravida, sollicitudin arcu eu, finibus sapien.`,
  `Sed malesuada sapien sit amet metus aliquam, nec pretium dui maximus.`,
  `Nunc non risus id nibh suscipit facilysis ut vel urna.`,
  `Vestibulum pharetra purus nec lectus pulvinar aliquam.`,
  `Interdum et malesuada fames ac ante ipsum primis in faucibus.`,
  `Sed eu facilysis libero.`,
  `Aliquam non efficitur odio.`,
  `Aliquam ut ultricies elit.`,
  `Aenean lacinia vehicula pulvinar.`,
  `Proin malesuada tellus lacus, porttitor porttitorex risus mattis id.`,
  `Duis pulvinar sapien id urna ultrices fermentum.`,
  `Vivamus hendrerit tempor purus, wel suscipit justo sagittis sed.`,
  `Integer semper neque imperdiet elit venenatis, id malesuada eros rutrum.`,
  `Sed nec placerat ante, et euismod leo.`,
  `Donec aliquet est ipsum, at volutpat est tincidunt vitae.`,
  `Morbi leo velit, faucibus sit amet viverra eu, bibendum ac ex.`,
  `Quisque maximus ultrices nibh sed suscipit.`,
  `In ornare eu feliz et luctus.`,
  `Proin efficitur tincidunt ipsum, a faucibus tortor lacinia a.`,
  `Quisque cursus odio ac enim scelerisque condimentum.`,
  `Vestibulum non elementum est.`,
  `Aenean ac risus bibendum, lacinia nulla quis, mollis sem.`,
  `Duis eu orci id nibh porta feugiat sed et justo.`,
  `Nulla suscipit tincidunt lacus, nec dictum massa dictum szelerisque.`,
  `Etiam feugiat facilysis tincidunt.`,
];

addLoremIpsum();

function addLoremIpsum() {
  const sectionText = $(`#lorem-ipsum`);

  for (let i = 0; i < loremIpsumText.length; i++) {
    const paragraph = $(`<p></p>`);
    paragraph.text(`${loremIpsumText[i]}`);
    sectionText.append(paragraph);
  }
}
