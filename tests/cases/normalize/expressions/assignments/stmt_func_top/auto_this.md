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

## Pre Normal

`````js filename=intro
let f = function () {
  const tmpthis = this;
  debugger;
  let a = { a: 999, b: 1000 };
  a = tmpthis;
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpthis = this;
  debugger;
  let a = { a: 999, b: 1000 };
  a = tmpthis;
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpthis = this;
  debugger;
  $(tmpthis);
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
