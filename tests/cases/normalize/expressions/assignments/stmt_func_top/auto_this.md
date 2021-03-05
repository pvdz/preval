# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Stmt func top > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = this;
  $(a);

  //*/// (end of file artifact)
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalThisAlias = this;
  let a = { a: 999, b: 1000 };
  a = tmpPrevalThisAlias;
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalThisAlias = this;
  $(tmpPrevalThisAlias);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
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
