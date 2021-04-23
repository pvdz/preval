# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident cond simple c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = 1 ? (40, 50, $(60)) : $($(100))) || (a = 1 ? (40, 50, $(60)) : $($(100)))
);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 ? (40, 50, $(60)) : $($(100))) || (a = 1 ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = $(60);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = undefined;
  tmpNestedComplexRhs = $(60);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = $(60);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = $(60);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - 2: 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
