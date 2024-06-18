# Preval test case

# call_member_prop_global.md

> Function trampoline > Call return > Call member prop global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const obj = {$};
const f =  function() {
  const r = obj.$(1);
  return r;
};
const q = f(); // In this test, this is the call we expect to be replaced by trampoline inlining...
$(q);
`````

## Pre Normal


`````js filename=intro
const obj = { $: $ };
const f = function () {
  debugger;
  const r = obj.$(1);
  return r;
};
const q = f();
$(q);
`````

## Normalized


`````js filename=intro
const obj = { $: $ };
const f = function () {
  debugger;
  const r = obj.$(1);
  return r;
};
const q = f();
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
