# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete arg[$("y")]) && (a = delete arg[$("y")]));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$((a = delete arg[$('y')]) && (a = delete arg[$('y')]));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpDeleteCompObj$1 = arg;
  const tmpDeleteCompProp$1 = $('y');
  const tmpNestedComplexRhs = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteCompProp = $('y');
let SSA_a = delete arg[tmpDeleteCompProp];
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  const tmpDeleteCompProp$1 = $('y');
  const tmpNestedComplexRhs = delete arg[tmpDeleteCompProp$1];
  SSA_a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: 'y'
 - 3: true
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
