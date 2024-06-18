# Preval test case

# call_member_dyn_param.md

> Function trampoline > Call return > Call member dyn param
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function(obj, str) {
  const r = obj[str](1);
  return r;
};
const obj = {$};
const q = f(obj, '$'); // In this test, this is the call we expect to be replaced by trampoline inlining...
$(q);
`````

## Pre Normal


`````js filename=intro
const f = function ($$0, $$1) {
  let obj$1 = $$0;
  let str = $$1;
  debugger;
  const r = obj$1[str](1);
  return r;
};
const obj = { $: $ };
const q = f(obj, `\$`);
$(q);
`````

## Normalized


`````js filename=intro
const f = function ($$0, $$1) {
  let obj$1 = $$0;
  let str = $$1;
  debugger;
  const r = obj$1[str](1);
  return r;
};
const obj = { $: $ };
const q = f(obj, `\$`);
$(q);
`````

## Output


`````js filename=intro
const obj = { $: $ };
const q = obj.$(1);
$(q);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
