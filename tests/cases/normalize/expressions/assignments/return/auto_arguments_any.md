# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Return > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = arguments);
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  a = tmpPrevalAliasArgumentsAny;
  let tmpReturnArg = a;
  return tmpReturnArg;
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  a = tmpPrevalAliasArgumentsAny;
  const tmpReturnArg = a;
  return tmpReturnArg;
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same