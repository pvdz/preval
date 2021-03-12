# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Assignments > Export default > Auto ident call ident complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
export default a = $($(1), $(2));
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
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const SSA_a = $(tmpCalleeParam, tmpCalleeParam$1);
const tmpAnonDefaultExport = SSA_a;
export { tmpAnonDefaultExport as default };
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
