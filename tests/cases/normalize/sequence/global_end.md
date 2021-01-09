# Preval test case

# end.md

> normalize > sequence > end
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

`````js filename=intro
($(1), $(2), $(3), $(4), ($(5), $(6)));
`````

## Normalized

`````js filename=intro
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
`````

## Uniformed

`````js filename=intro
x(8);
x(8);
x(8);
x(8);
x(8);
x(8);
`````

## Output

`````js filename=intro
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
`````
