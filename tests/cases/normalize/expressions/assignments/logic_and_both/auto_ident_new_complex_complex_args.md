# Preval test case

# auto_ident_new_complex_complex_args.md

> normalize > expressions > assignments > logic_and_both > auto_ident_new_complex_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new ($($))($(1), $(2))) && (a = new ($($))($(1), $(2))));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNewCallee = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
const tmpNestedComplexRhs = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$2);
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  const tmpNewCallee$1 = $($);
  const tmpCalleeParam$3 = $(1);
  const tmpCalleeParam$4 = $(2);
  const tmpNestedComplexRhs$1 = new tmpNewCallee$1(tmpCalleeParam$3, tmpCalleeParam$4);
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: '<$>'
 - 6: 1
 - 7: 2
 - 8: 1, 2
 - 9: {}
 - 10: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
