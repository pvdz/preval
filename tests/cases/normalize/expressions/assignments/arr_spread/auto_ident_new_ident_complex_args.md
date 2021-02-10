# Preval test case

# auto_ident_new_ident_complex_args.md

> normalize > expressions > assignments > arr_spread > auto_ident_new_ident_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$([...(a = new $($(1), $(2)))]);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpArrSpread;
const tmpNewCallee = $;
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
const tmpNestedComplexRhs = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$2);
a = tmpNestedComplexRhs;
tmpArrSpread = tmpNestedComplexRhs;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
