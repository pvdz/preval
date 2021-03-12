# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Param default > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = this)) {}
$(f());
$(a);

//*/// (end of file artifact)
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = this) : tmpParamDefault;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  const tmpPrevalAliasThis = this;
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    a = tmpPrevalAliasThis;
    p = tmpPrevalAliasThis;
  } else {
    p = tmpParamDefault;
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
const f = function (tmpParamDefault) {
  const tmpPrevalAliasThis = this;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    a = tmpPrevalAliasThis;
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
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
