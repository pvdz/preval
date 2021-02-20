# Preval test case

# class_expr_stmt_computed_keys.md

> Normalize > Class > Class expr stmt computed keys
>
> Class expression as a statement (possible as we can see here, not the same as a decl), should be dropped entirely.

#TODO

## Input

`````js filename=intro
(class x {
  [$('a')](){}
  [$('b')](){}
});
`````

## Normalized

`````js filename=intro
const tmpClassComputedKey = $('a');
const tmpClassComputedKey$1 = $('b');
`````

## Output

`````js filename=intro
$('a');
$('b');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
