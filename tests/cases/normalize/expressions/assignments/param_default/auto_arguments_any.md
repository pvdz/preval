# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Param default > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = arguments)) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__p) {
  const tmpPrevalArgumentsAlias = arguments;
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    a = tmpPrevalArgumentsAlias;
    p = tmpPrevalArgumentsAlias;
  } else {
    p = $tdz$__p;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function ($tdz$__p) {
  const tmpPrevalArgumentsAlias = arguments;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    a = tmpPrevalArgumentsAlias;
  }
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
 - 1: undefined
 - 2: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
