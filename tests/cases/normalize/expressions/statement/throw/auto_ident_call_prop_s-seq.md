# Preval test case

# auto_ident_call_prop_s-seq.md

> Normalize > Expressions > Statement > Throw > Auto ident call prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
throw (1, 2, b).$(1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
throw (1, 2, b).$(1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = b;
const tmpThrowArg = tmpCallObj.$(1);
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpThrowArg = b.$(1);
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
throw b;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
