# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = ($(1), $(2), x)) && (a = ($(1), $(2), x)));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(1);
$(2);
a = x;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(1);
  $(2);
  const tmpNestedComplexRhs = x;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
$(1);
$(2);
let SSA_a = 1;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  $(1);
  $(2);
  SSA_a = 1;
  tmpCalleeParam = 1;
}
$(tmpCalleeParam);
$(SSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
