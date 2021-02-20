# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Statement > Throw > Auto ident call ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
throw $($(1), $(2));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpThrowArg = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpThrowArg = $(tmpCalleeParam, tmpCalleeParam$1);
throw tmpThrowArg;
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
