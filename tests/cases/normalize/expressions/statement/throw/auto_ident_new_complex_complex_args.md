# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Statement > Throw > Auto ident new complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
throw new ($($))($(1), $(2));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpThrowArg = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpThrowArg = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - eval returned: ('<crash[ [object Object] ]>')

Normalized calls: Same

Final output calls: Same
