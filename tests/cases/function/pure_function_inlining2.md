# Preval test case

# pure_function_inlining2.md

> Function > Pure function inlining2
>
> Testing a particular normalize infinite loop due to not eliminating idents

## Input

`````js filename=intro
const rule = function(desc) {
  const func = $;
  PURPLE;
  `purple`;
  PURPLE;
  `purple`;
  RESET;
  `reset`;
  const tmpStringConcatL = $coerce(desc, `plustr`);
  const d = `purpleRule:reset "${tmpStringConcatL}`;
  const tmpStringConcatR$3 = d;
  tmpStringConcatR$3;
  const e = `${d}"`;
  func(e);
  return undefined;
};
const PURPLE = `purple`;
const RESET = `reset`;
rule(`I want it my way`);
rule(`You have to listen to me`);
`````

## Pre Normal


`````js filename=intro
const rule = function ($$0) {
  let desc = $$0;
  debugger;
  const func = $;
  null;
  `purple`;
  null;
  `purple`;
  null;
  `reset`;
  const tmpStringConcatL = $coerce(desc, `plustr`);
  const d = `purpleRule:reset "` + $coerce(tmpStringConcatL, `string`) + ``;
  const tmpStringConcatR$3 = d;
  null;
  const e = `` + $coerce(d, `string`) + `"`;
  func(e);
  return undefined;
};
const PURPLE = `purple`;
const RESET = `reset`;
rule(`I want it my way`);
rule(`You have to listen to me`);
`````

## Normalized


`````js filename=intro
const rule = function ($$0) {
  let desc = $$0;
  debugger;
  const func = $;
  const tmpStringConcatL = $coerce(desc, `plustr`);
  const tmpBinBothLhs = `purpleRule:reset "`;
  const tmpBinBothRhs = $coerce(tmpStringConcatL, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const d = $coerce(tmpBinLhs, `plustr`);
  const tmpStringConcatR$3 = d;
  const tmpBinBothLhs$1 = ``;
  const tmpBinBothRhs$1 = $coerce(d, `string`);
  const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
  const e = `${tmpStringConcatR}"`;
  func(e);
  return undefined;
};
const PURPLE = `purple`;
const RESET = `reset`;
rule(`I want it my way`);
rule(`You have to listen to me`);
`````

## Output


`````js filename=intro
const rule /*:(string)=>*/ = function ($$0) {
  const desc /*:string*/ = $$0;
  debugger;
  const e /*:string*/ = `purpleRule:reset "${desc}"`;
  $(e);
  return undefined;
};
rule(`I want it my way`);
rule(`You have to listen to me`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = `purpleRule:reset "${b}"`;
  $( d );
  return undefined;
};
a( "I want it my way" );
a( "You have to listen to me" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'purpleRule:reset "I want it my way"'
 - 2: 'purpleRule:reset "You have to listen to me"'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
