# Preval test case

# dupe_label.md

> labels > dupe_label
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
foo: break foo;
foo: break foo;
foo: break foo;
`````

## Normalized

`````js filename=intro
foo: {
  break foo;
}
foo_1: {
  break foo_1;
}
foo_2: {
  break foo_2;
}
`````

## Uniformed

`````js filename=intro
x: {
  break x;
}
x: {
  break x;
}
x: {
  break x;
}
`````

## Output

`````js filename=intro
foo: {
  break foo;
}
foo_1: {
  break foo_1;
}
foo_2: {
  break foo_2;
}
`````
