# Preval test case

# break_loop.md

> Labels > Break loop
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
foo: while(true) {
  $(1);
  break foo;
}
$(2);
`````

## Pre Normal

`````js filename=intro
foo: while (true) {
  $(1);
  break foo;
}
$(2);
`````

## Normalized

`````js filename=intro
while (true) {
  $(1);
  break;
}
$(2);
`````

## Output

`````js filename=intro
$(1);
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
