# Preval test case

# arg_as_method_arg.md

> Static arg ops > Arg as method arg
>
> When the first line of a function operates on an arg and the func is only called, outline the operation.

## Input

`````js filename=intro
const f = function(aa) {
  const a = aa;
  "foo".slice(a);
};
f(`0`);
const t = f(`1`);
$(t);
`````

## Pre Normal

`````js filename=intro
const f = function ($$0) {
  let aa = $$0;
  debugger;
  const a = aa;
  `foo`.slice(a);
};
f(`0`);
const t = f(`1`);
$(t);
`````

## Normalized

`````js filename=intro
const f = function ($$0) {
  let aa = $$0;
  debugger;
  const a = aa;
  `foo`.slice(a);
  return undefined;
};
f(`0`);
const t = f(`1`);
$(t);
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
