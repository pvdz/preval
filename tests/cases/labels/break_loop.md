# Preval test case

# break_loop.md

> labels > break_loop
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

## Normalized

`````js filename=intro
foo: while (true) {
  $(1);
  break foo;
}
$(2);
`````

## Output

`````js filename=intro
foo: while (true) {
  $(1);
  break foo;
}
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
