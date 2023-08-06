



export default function ExerciceForm({unitId,onUpdateUnitId}) {
    const types = [
        {
            unitId: 126,
            name: '정수의 분류',
            nameEn: 'Classification of Integers'
        },
        {
            unitId: 128,
            name: "유리수의 덧셈과 뺄셈",
            nameEn: "Addition and Subtraction of Rational Numbers"
        },
        {
            unitId: 129,
            name: "유리수를 선택하여 곱하기",
            nameEn: "Multiplying by Selecting Rational Numbers"
        },
        {
            unitId: 153,
            name: "분수를 유한소수로 나타내기",
            nameEn: "Representing Fractions as Finite Decimals"
        },
        {
            unitId: 297,
            name: "어떤 수 구하기; 덧셈, 뺄셈",
            nameEn: "Finding Numbers; Addition and Subtraction"
        },
        {
            unitId: 298,
            name: '-1의 거듭제곱',
            nameEn: 'Power of -1'
        },
        {
            unitId: 310,
            name: '절댓값',
            nameEn: 'Absolute Values'
        },
        {
            unitId: 314,
            name: '절댓값의 대소 관계',
            nameEn: 'Comparison of Absolute Values'
        },
        {
            unitId: 315,
            name: '절댓값이 같고 부호가 반대인 두 수',
            nameEn: 'Positive and Negative Numbers with Equal Absolute Values'
        },
        {
            unitId: 324,
            name: '분배법칙',
            nameEn: 'Distributive Laws'
        },
        {
            unitId: 344,
            name: '절댓값이 주어진 두 수의 덧셈과 뺄셈',
            nameEn: 'Addition and Subtraction of Two Numbers with Absolute Values'
        },
        {
            unitId: 345,
            name: '유한소수가 되도록 하는 미지수 구하기',
            nameEn: 'Find the Unknown that Makes Fraction a Finite Decimal'
        },
        {
            unitId: 359,
            name: '덧셈과 뺄셈의 혼합 계산',
            nameEn: 'Mixed Calculations of Addition and Subtraction'
        },
        {
            unitId: 380,
            name: '유리수의 덧셈, 뺄셈, 곱셈, 나눗셈의 혼합 계산',
            nameEn: 'Mixed Calculation of Addition, Subtraction, Multiplication, and Division of Rational Numbers'
        },
        {
            unitId: 440,
            name: '유리수의 덧셈과 뺄셈의 활용',
            nameEn: 'Applications of Addition and Subtraction of Rational Numbers'
        },
        {
            unitId: 453,
            name: '두 유리수 사이의 정수 구하기',
            nameEn: 'Finding Integers between Two Rational Numbers'
        },
        {
            unitId: 456,
            name: '두 유리수 사이의 정수가 아닌 유리수 구하기',
            nameEn: 'Finding Rational Numbers that are Not Integers between Two Rational Numbers'
        },
        {
            unitId: 474,
            name: 'ㅇ보다 ㅁ만큼 큰(작은) 수',
            nameEn: 'Number Greater(or Less) than p by q'
        },
        {
            unitId: 478,
            name: '바르게 계산한 값 구하기 -덧셈과 뺄셈',
            nameEn: 'Finding Correctly Calculated Values -Addition and Subtraction'
        },
        {
            unitId: 480,
            name: '조건을 만족하는 수 구하기',
            nameEn: 'Finding Numbers that Satisfiy Conditions'
        },
        {
            unitId: 482,
            name: '거듭제곱의 계산',
            nameEn: 'Calculations of Powers'
        },
        {
            unitId: 483,
            name: '역수',
            nameEn: 'Inverse Numbers'
        },
        {
            unitId: 485,
            name: '유리수의 나눗셈',
            nameEn: 'Division of Rational Numbers'
        },
        {
            unitId: 490,
            name: '곱셈과 나눗셈의 혼합 계산',
            nameEn: 'Mixed Calculations of Multiplication and Division'
        },
        {
            unitId: 491,
            name: '어떤 수 구하기; 곱셈, 나눗셈',
            nameEn: 'Finding Numbers; Multiplication and Division'
        },
        {
            unitId: 492,
            name: '바르게 계산한 값 구하기 -곱셈과 나눗셈',
            nameEn: 'Finding Correctly Calculated Values -Multiplication and Division'
        },
        {
            unitId: 505,
            name: '조건이 주어진 수의 대소 관계',
            nameEn: 'Comparison of Numbers that Conditions are Given'
        },
        {
            unitId: 510,
            name: '새로운 연산 기호',
            nameEn: 'New Arithmetic Symbols'
        },
        {
            unitId: 525,
            name: '수직선에서 같은 거리에 있는 점',
            nameEn: 'Equidistant Points on the Number Line'
        },
        {
            unitId: 584,
            name: '수직선을 이용하여 수 찾기',
            nameEn: 'Finding Numbers Using the Number Line'
        },
        {
            unitId: 613,
            name: '유한소수가 되는 분수를 기약분수로 나타낼 때 미지수 구하기',
            nameEn: 'Finding the Unknown When Representing a Fraction That Becomes a Finite Decimal as a Reducible Fraction'
        },
        {
            unitId: 645,
            name: '두 분수가 유한소수가 되도록 하는 미지수 구하기',
            nameEn: 'Find the Unknown that Makes Two Fractions a Finite Decimal'
        },
        {
            unitId: 646,
            name: '소수점 아래 n번째 자리의 숫자 구하기',
            nameEn: 'Find the Number with the nth Place After the Decimal Point'
        },
        {
            unitId: 648,
            name: '수를 수직선 위에 나타내기',
            nameEn: 'Display a Number on a Vertical Line'
        },
        {
            unitId: 649,
            name: '순환마디',
            nameEn: 'Cycle'
        },
        {
            unitId: 650,
            name: '순환소수가 되도록 하는 미지수 구하기',
            nameEn: 'Find the Unknown that Makes it a Repeating Decimal'
        },
        {
            unitId: 654,
            name: '유한소수로 나타낼 수 있는 분수',
            nameEn: 'A Fraction that Can be Expressed as a Finite Decimal Number'
        },
        {
            unitId: 655,
            name: '유한소수와 무한소수',
            nameEn: 'Finite and Infinite Decimals'
        },
        {
            unitId: 658,
            name: '순환소수의 표현',
            nameEn: 'Representation of a Repeating Decimal'
        }
    ]
    let options = [];
    types.forEach((type) => {
        options.push({value: type.unitId, label: navigator.language.includes('kr') ? type.name : type.nameEn})
    })

    function onSubmit(e) {
        e.preventDefault();
        console.dir(e.target[0].value)
        onUpdateUnitId(e.target[0].value)
    }

    return (
        <>
            <form
                onSubmit={onSubmit}
                style={{ display: 'flex', alignItems: 'center' }}
            >
                <select 
                    id="exercices" 
                    defaultValue={unitId}
                    style={{
                        marginRight: '10px',
                        padding: '5px',
                        borderRadius: '10px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        color: '#3e649b',
                        fontSize: '16px',
                        fontFamily: 'Montserrat',
                        padding: '5px 10px'
                    }}
                >
                    {options.map((option) => {
                        return <option
                                    key={option.value}
                                    value={option.value}
                                >{option.label}</option>
                    })}
                </select>
                <button
                    type="submit"
                    value="Submit"
                    style={{
                        background: 'white',
                        color: 'black',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                >Create</button>
            </form>
        </>)
}