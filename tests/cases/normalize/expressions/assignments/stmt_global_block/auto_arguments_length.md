# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Stmt global block > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = arguments;
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = arguments;
  $(a);
}
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = arguments;
$(a);
`````

## Output


`````js filename=intro
arguments;
$(arguments);
`````

## PST Output

With rename=true

`````js filename=intro
arguments;
$( arguments );
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
