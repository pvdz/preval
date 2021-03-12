# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1;

  let a = { a: 999, b: 1000 };
  a = ($(1), $(2), x);
  $(a, x);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let x = 1;
  let a = { a: 999, b: 1000 };
  a = ($(1), $(2), x);
  $(a, x);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let x = 1;
  let a = { a: 999, b: 1000 };
  $(1);
  $(2);
  a = x;
  $(a, x);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $(1);
  $(2);
  $(1, 1);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
