# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Statement > Export default > Auto ident call ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
export default $($(1), $(2));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpAnonDefaultExport = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpAnonDefaultExport = $(tmpCalleeParam, tmpCalleeParam$1);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
