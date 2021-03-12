# Preval test case

# auto_computed_simple_complex_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto computed simple complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) && (a = { b: $(1) }));
a[$("b")] = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) && (a = { b: $(1) }));
a[$('b')] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpObjLitVal$1 = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal$1 };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $('b');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
let SSA_a = { b: tmpObjLitVal };
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  const tmpObjLitVal$1 = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal$1 };
  SSA_a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
const tmpAssignComMemLhsObj = SSA_a;
const tmpAssignComMemLhsProp = $('b');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { b: '1' }
 - 4: 'b'
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
