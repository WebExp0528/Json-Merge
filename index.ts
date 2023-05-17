import fs from 'fs';
import _ from 'lodash';

(() => {
  const files = fs.readdirSync('./03');
  const mergedData = _.unionBy(
    _.compact(
      files.flatMap((file) => {
        let rawData = fs.readFileSync(`./03/${file}`, 'utf-8');
        return JSON.parse(rawData);
      })
    )
  );

  const uniqData = _.uniqBy(mergedData, 'ID');

  console.log('~~~~~~~ count', mergedData.length);

  console.log('~~~~~~~ uniqData', uniqData.length);

  console.log(
    '~~~~~~~ PARTIAL_FLAG===1 count',
    uniqData.filter(({ PARTIAL_FLAG }) => PARTIAL_FLAG === 1).length
  );

  console.log(
    '~~~~~~~ PARTIAL_FLAG===2 count',
    uniqData.filter(({ PARTIAL_FLAG }) => PARTIAL_FLAG === 2).length
  );

  fs.writeFileSync('./merged.json', JSON.stringify(mergedData), 'utf-8');
})();
