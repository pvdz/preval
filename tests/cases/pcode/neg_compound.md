# Preval test case

# neg_compound.md

> Pcode > Neg compound

## Options

- pcode

## Input

`````js filename=intro
function f(a) {
  return 1+-a;
}

$(f(1));
$(f(2));
$(f('a'));
$(f(true));
`````


## Pcode output


`````fileintro
f =
    [ r0 = $$0 - ]
    [ r1 = - 1 ]
    [ r2 neg r0 - ]
    [ r3 + r1 - r2 - ]
    [ return r3 - ]
`````




## Todos triggered


None


## Pcode result


Running function "f":

                                    pcode          =>   eval
 - `f()`                       => `null`           => `null`            Ok
 - `f(undefined)`              => `null`           => `null`            Ok
 - `f(null)`                   => `1`              => `1`               Ok
 - `f(true)`                   => `0`              => `0`               Ok
 - `f(false)`                  => `1`              => `1`               Ok
 - `f("")`                     => `1`              => `1`               Ok
 - `f("preval")`               => `null`           => `null`            Ok
 - `f(0)`                      => `1`              => `1`               Ok
 - `f(1)`                      => `0`              => `0`               Ok
 - `f(0, 0)`                   => `1`              => `1`               Ok
 - `f(0, 1)`                   => `1`              => `1`               Ok
 - `f(1, 0)`                   => `0`              => `0`               Ok
 - `f(1, 1)`                   => `0`              => `0`               Ok
 - `f(1)`                      => `0`              => `0`               Ok
 - `f(2)`                      => `-1`             => `-1`              Ok
 - `f("a")`                    => `null`           => `null`            Ok
 - `f(true)`                   => `0`              => `0`               Ok
