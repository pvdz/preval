# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > assignments > logic_and_both > auto_ident_delete_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete ($(1), $(2), arg).y) && (a = delete ($(1), $(2), arg).y));
$(a, x);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(1);
$(2);
const tmpDeleteObj = arg;
a = delete tmpDeleteObj.y;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(1);
  $(2);
  const tmpDeleteObj$1 = arg;
  const tmpNestedComplexRhs = delete tmpDeleteObj$1.y;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = arg;
a = delete tmpDeleteObj.y;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(1);
  $(2);
  const tmpDeleteObj$1 = arg;
  const tmpNestedComplexRhs = delete tmpDeleteObj$1.y;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: true
 - 6: true, undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
