# Preval test case

# call_member_prop_global.md

> Function trampoline > Call only > Call member prop global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const obj = {$};
const f =  function() {
  obj.$(1);
};
f(); // In this test, this is the call we expect to be replaced by trampoline inlining...
`````

## Pre Normal


`````js filename=intro
const obj = { $: $ };
const f = function () {
  debugger;
  obj.$(1);
};
f();
`````

## Normalized


`````js filename=intro
const obj = { $: $ };
const f = function () {
  debugger;
  obj.$(1);
  return undefined;
};
f();
`````

## Output


`````js filename=intro
const obj /*:object*/ = { $: $ };
obj.$(1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
a.$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
