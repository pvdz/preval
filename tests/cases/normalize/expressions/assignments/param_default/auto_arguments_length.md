# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Param default > Auto arguments length
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
  const tmpPrevalAliasArgumentsAny = arguments;
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    a = tmpPrevalAliasArgumentsAny;
    p = tmpPrevalAliasArgumentsAny;
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
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    a = tmpPrevalAliasArgumentsAny;
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