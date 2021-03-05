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

## Normalized

`````js filename=intro
let f = function ($tdz$__p) {
  const tmpPrevalThisAlias = this;
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpNestedComplexRhs = tmpPrevalThisAlias;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
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
  const tmpPrevalThisAlias = this;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    a = tmpPrevalThisAlias;
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

Normalized calls: Same

Final output calls: Same
