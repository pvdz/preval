# Preval test case

# auto_ident_s-seq.md

> normalize > expressions > assignments > logic_and_left > auto_ident_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = ($(1), $(2), x)) && $(100));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
$(1);
$(2);
const tmpNestedComplexRhs = x;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
}
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
$(1);
$(2);
a = 1;
tmpCalleeParam = 1;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
}
tmpCallCallee(tmpCalleeParam);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 100
 - 4: 100
 - 5: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
