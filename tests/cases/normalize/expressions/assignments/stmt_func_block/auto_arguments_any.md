# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Stmt func block > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = arguments;
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let a = { a: 999, b: 1000 };
    a = arguments;
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  let a = { a: 999, b: 1000 };
  a = tmpPrevalAliasArgumentsAny;
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(tmpPrevalAliasArgumentsAny);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
