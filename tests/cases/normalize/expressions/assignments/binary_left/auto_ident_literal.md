# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Binary left > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = "foo") + $(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 'foo';
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothRhs = $(100);
const tmpCalleeParam = 'foo' + tmpBinBothRhs;
$(tmpCalleeParam);
$('foo');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'foo100'
 - 3: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
