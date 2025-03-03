# Preval test case

# string_outlining.md

> Static arg ops > String > String outlining

Distilled from tests/cases/function/pure_function_inlining.md

## Input

`````js filename=intro
const rule /*:(string)=>undefined*/ = function (desc) {
  const e /*:string*/ = `purpleRule:reset "${desc}"`;
  $(e);
};
rule(`I want it my \\way`);
rule(`You have to listen to me`);
`````

## Pre Normal


`````js filename=intro
const rule = function ($$0) {
  let desc = $$0;
  debugger;
  const e = `purpleRule:reset "` + $coerce(desc, `string`) + `"`;
  $(e);
};
rule(`I want it my \\way`);
rule(`You have to listen to me`);
`````

## Normalized


`````js filename=intro
const rule = function ($$0) {
  let desc = $$0;
  debugger;
  const tmpBinBothLhs = `purpleRule:reset "`;
  const tmpBinBothRhs = $coerce(desc, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
  const e = `${tmpStringConcatR}"`;
  $(e);
  return undefined;
};
rule(`I want it my \\way`);
rule(`You have to listen to me`);
`````

## Output


`````js filename=intro
$(`purpleRule:reset "I want it my \\way"`);
$(`purpleRule:reset "You have to listen to me"`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "purpleRule:reset \"I want it my \\way\"" );
$( "purpleRule:reset \"You have to listen to me\"" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'purpleRule:reset "I want it my \\way"'
 - 2: 'purpleRule:reset "You have to listen to me"'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
