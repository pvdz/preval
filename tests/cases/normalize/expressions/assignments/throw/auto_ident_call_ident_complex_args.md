# Preval test case

# auto_ident_call_ident_complex_args.md

> normalize > expressions > assignments > throw > auto_ident_call_ident_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
throw (a = $($(1), $(2)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
$;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const SSA_a = $(tmpCalleeParam, tmpCalleeParam$1);
throw SSA_a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same
