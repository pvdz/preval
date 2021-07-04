# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: 1, y: 2, z: 3 }) || (a = { x: 1, y: 2, z: 3 }));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: 1, y: 2, z: 3 }) || (a = { x: 1, y: 2, z: 3 }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = { x: 1, y: 2, z: 3 };
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = { x: 1, y: 2, z: 3 };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { x: 1, y: 2, z: 3 };
const tmpCalleeParam = a;
if (a) {
  $(tmpCalleeParam);
} else {
  const tmpNestedComplexRhs = { x: 1, y: 2, z: 3 };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - 2: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
