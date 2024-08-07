# Preval test case

# return_var_param_no_args.md

> Function inlining > Return var param no args
>
> A function that is a variable decl with simple init and a return of this value should be inlined

The constant should be eliminated anyways but that's a different matter.

## Input

`````js filename=intro
function f(a) {
  const x = a;
  return x;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a;
  return x;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
