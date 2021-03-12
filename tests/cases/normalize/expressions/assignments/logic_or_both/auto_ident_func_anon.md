# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = function () {}) || (a = function () {}));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = function () {}) || (a = function () {}));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = function () {};
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = function () {};
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let SSA_a = function () {};
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = function () {};
  SSA_a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
