import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export const register = (req: Request, res: Response, next: NextFunction) => {
    const { roll_no, email } = req.body;
    if (!roll_no || !email) {
        return res.status(400).json({ message: 'roll_no and email are required' });
    }
	if (roll_no.length !== 11) {
        return res.status(400).json({ message: 'Invalid Roll No' });
    }
	if(!validator.isEmail(email)){
        return res.status(400).json({ message: 'Invalid Email' });
    }
    next();
}

export const registerVerification = (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: 'email and otp are required' });
    }
	if (otp.length !== 6) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }
	if(!validator.isEmail(email)){
        return res.status(400).json({ message: 'Invalid Email' });
	}
    next();
}

export const login = (req: Request, res: Response, next: NextFunction) => {
	const { id, email } = req.body;
	if (!id || !email) {
        return res.status(400).json({ message: 'roll_no and email are required' });
    }
    next();
}
