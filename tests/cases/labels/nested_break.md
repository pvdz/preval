# Preval test case

# nested_break.md

> Labels > Nested break
>
> Labels should not throw

## Input

`````js filename=intro
a: b: c: {
  if ($(1)) break a;
  else break b;
}
`````

## Pre Normal


`````js filename=intro
a: b: c: {
  if ($(1)) break a;
  else break b;
}
`````

## Normalized


`````js filename=intro
b: {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    break b;
  } else {
    break b;
  }
}
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
