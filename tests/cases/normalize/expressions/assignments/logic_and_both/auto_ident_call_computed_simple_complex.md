# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident call computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = b[$("$")](1)) && (a = b[$("$")](1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = b[$(`\$`)](1)) && (a = b[$(`\$`)](1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCompObj = b;
const tmpCallCompProp = $(`\$`);
a = tmpCallCompObj[tmpCallCompProp](1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCallCompObj$1 = b;
  const tmpCallCompProp$1 = $(`\$`);
  const tmpNestedComplexRhs = tmpCallCompObj$1[tmpCallCompProp$1](1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCallCompProp = $(`\$`);
const b = { $: $ };
let a = b[tmpCallCompProp](1);
const tmpCalleeParam = a;
if (a) {
  const tmpCallCompProp$1 = $(`\$`);
  const tmpNestedComplexRhs = b[tmpCallCompProp$1](1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
